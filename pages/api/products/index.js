import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('pantry-watch');

  switch (req.method) {
    case 'POST':
      const product = {
        ...req.body,
        quantity: parseInt(req.body.quantity, 10)
      };
      await db.collection('products').insertOne(product);
      res.status(201).json({ message: 'Product added successfully' });
      break;

      case 'GET':
        try {
          const { lowQuantity, expired, closeToExpire } = req.query;
  
          let products;
          if (lowQuantity === 'true') {
            products = await db
              .collection('products')
              .find({ quantity: { $lt: 5 } })
              .toArray();
          } else if (expired === 'true') {
            const currentDate = new Date().toISOString().split('T')[0]; 
            products = await db
              .collection('products')
              .find({ expirationDate: { $lt: currentDate } })
              .toArray();
          } else if (closeToExpire === 'true') {
            const currentDate = new Date().toISOString().split('T')[0];
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 7); 
            const futureDateString = futureDate.toISOString().split('T')[0]; 
  
            products = await db
              .collection('products')
              .find({
                expirationDate: {
                  $gte: currentDate, 
                  $lte: futureDateString,
                },
              })
              .toArray();
          } else {
            products = await db.collection('products').find({}).toArray();
          }
  
          console.log('Fetched products:', products);
          res.status(200).json(products);
        } catch (error) {
          console.error('Error fetching products:', error);
          res.status(500).json({ message: 'Failed to fetch products', error });
        }
        break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}