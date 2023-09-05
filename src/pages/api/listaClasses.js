import connectDB from "@/db";
import Classe from "@/models/Classe";

connectDB();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const classes = await Classe.getAllClasses();
            res.status(200).json(classes);
        } catch (error) {
            res.status(500).json({ error: 'erro fetch classes' });
        }
    }
}
