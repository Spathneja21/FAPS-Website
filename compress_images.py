import os
from PIL import Image, ImageOps

def compress_images_in_dir(directory, max_size=(1600, 1600), quality=80):
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            # Skip non-images
            if not file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                continue
            
            try:
                # Open image
                original_size = os.path.getsize(file_path)
                with Image.open(file_path) as img:
                    # Fix orientation issues before modification
                    img = ImageOps.exif_transpose(img)
                    
                    # Check if it needs resizing
                    if img.width > max_size[0] or img.height > max_size[1]:
                        img.thumbnail(max_size, Image.Resampling.LANCZOS)
                    
                    format_to_save = img.format if img.format else "JPEG"
                    is_jpeg = file.lower().endswith(('.jpg', '.jpeg'))
                    is_png = file.lower().endswith('.png')
                    is_webp = file.lower().endswith('.webp')
                    
                    if is_jpeg:
                        img = img.convert("RGB")
                        img.save(file_path, "JPEG", quality=quality, optimize=True)
                    elif is_png:
                        img.save(file_path, "PNG", optimize=True)
                    elif is_webp:
                        img.save(file_path, "WEBP", quality=quality, optimize=True)
                    else:
                        img.save(file_path)

                new_size = os.path.getsize(file_path)
                print(f"Compressed: {file} | {original_size // 1024}KB -> {new_size // 1024}KB")
            except Exception as e:
                print(f"Error compressing {file_path}: {e}")

if __name__ == '__main__':
    compress_images_in_dir("public/Gallery")
    compress_images_in_dir("public/Team images")
