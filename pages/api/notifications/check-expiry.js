import clientPromise from '../../../lib/mongodb';
import { sendEmail } from '../../../lib/email';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end();
  }

  const client = await clientPromise;
  const db = client.db('pantry-watch');

  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = tomorrow.toISOString().split('T')[0];
    const expiringProducts = await db.collection('products').find({
      expirationDate: tomorrowDateString,
      notificationSent: false,
      enableNotifications: true
    }).toArray();

    for (const product of expiringProducts) {
      const userEmail = process.env.USER_EMAIL;
      
      if (userEmail) {
        await sendEmail({
          to: userEmail,
          subject: `Product Expiring: ${product.name}`,
          html: `
            <p>Your product <strong>${product.name}</strong> is expiring tomorrow!</p>
            <p>Quantity: ${product.quantity}</p>
            <p>Barcode: ${product.barcode}</p>
            <p>Expiration Date: ${product.expirationDate}</p>
          `
        });

        await db.collection('products').updateOne(
          { _id: product._id },
          { $set: { notificationSent: true } }
        );
      }
    }

    return res.status(200).json({ 
      success: true, 
      notifiedCount: expiringProducts.length 
    });
  } catch (error) {
    console.error('Notification error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}