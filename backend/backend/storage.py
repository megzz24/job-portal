from cloudinary_storage.storage import RawMediaCloudinaryStorage

class RawCloudinaryStorage(RawMediaCloudinaryStorage):
    resource_type = "raw"
    access_mode = "public"
