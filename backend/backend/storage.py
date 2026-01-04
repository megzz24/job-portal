from cloudinary_storage.storage import MediaCloudinaryStorage

class RawCloudinaryStorage(MediaCloudinaryStorage):
    resource_type = "raw"

    def get_upload_options(self, name, content=None):
        options = super().get_upload_options(name, content)
        options.update({
            "resource_type": "raw",
            "access_mode": "public",   # 👈 THIS is mandatory
        })
        return options
