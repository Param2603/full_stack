import multer from "multer"
const storage = multer.memoryStorage()

// single upload
export const singleUpload = multer({ storage }).single("file")

// ✅ FIXED: field name must be "images"
export const multipleUpload = multer({ storage }).array("images", 5)
