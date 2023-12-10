import { createUploadthing } from "uploadthing/next";
const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profilePicture: f({ image: { maxFileSize: "2MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
    }
  ),
};