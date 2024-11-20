export default async function sitemap() {
  return [
    {
      url: "https://www.geradoor.com",
      lastModified: new Date(),
      priority: 1
    },
    {
      url: "https://www.geradoor.com/qr-code",
      lastModified: new Date(),
      priority: 0.8
    },
    {
      url: "https://www.geradoor.com/whatsapp",
      lastModified: new Date(),
      priority: 0.8
    },
  ]
}