from cloudinary_storage.storage import RawMediaCloudinaryStorage

class RawCloudinaryStorage(RawMediaCloudinaryStorage):
    resource_type = "raw"
    type = "upload"          # VERY IMPORTANT
    access_mode = "public"   # VERY IMPORTANT