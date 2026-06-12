import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Limite de 5MB

export default upload;
