import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('pantry-watch');

  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      try {
        const updatedProduct = req.body;
        await db
          .collection('products')
          .updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });
        res.status(200).json({ message: 'Product updated successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
      }
      break;

    case 'DELETE':
      try {
        await db.collection('products').deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}