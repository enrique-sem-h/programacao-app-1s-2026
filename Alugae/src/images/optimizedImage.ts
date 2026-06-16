type ImageSize = {
  width: number;
  height?: number;
  quality?: number;
};

type NormalizedImageSize = {
  width: number;
  height?: number;
  quality: number;
};

const DEFAULT_QUALITY = 70;

function buildUnsplashUrl(url: URL, { width, height, quality }: NormalizedImageSize) {
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality));

  if (height) {
    url.searchParams.set("h", String(height));
  }

  return url.toString();
}

function buildCloudinaryUrl(rawUrl: string, { width, height }: NormalizedImageSize) {
  if (!rawUrl.includes("/upload/")) {
    return rawUrl;
  }

  const transforms = ["f_auto", "q_auto", "c_fill", `w_${width}`];

  if (height) {
    transforms.push(`h_${height}`);
  }

  return rawUrl.replace("/upload/", `/upload/${transforms.join(",")}/`);
}

export function getOptimizedImageUrl(url: string | null | undefined, size: ImageSize) {
  if (!url) {
    return null;
  }

  const width = Math.ceil(size.width);
  const height = size.height ? Math.ceil(size.height) : undefined;
  const quality = size.quality ?? DEFAULT_QUALITY;

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.toLowerCase();

    if (host.includes("images.unsplash.com")) {
      return buildUnsplashUrl(parsedUrl, { width, height, quality });
    }

    if (host.includes("res.cloudinary.com")) {
      return buildCloudinaryUrl(url, { width, height, quality });
    }
  } catch {
    return url;
  }

  return url;
}
