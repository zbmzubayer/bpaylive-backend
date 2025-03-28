import fs from 'fs';
import path from 'path';

export const deleteFile = (filename: string) => {
  const filePath = path.join(__dirname, '../../uploads', filename); // Construct the file path

  console.log(filePath);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    }
  });
};
