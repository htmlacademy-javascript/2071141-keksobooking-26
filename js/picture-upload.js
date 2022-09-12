const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const userPhotoPick = document.querySelector ('.ad-form__field input[type=file]');
const userPhotoPreview = document.querySelector ('.ad-form-header__preview img');
const adPhotoPick = document.querySelector ('.ad-form__upload input[type=file]');
const adPhotoPreview = document.querySelector ('.ad-form__photo');

const addPhoto = (photoUpload, preview) => {
  const file = photoUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {preview.src = URL.createObjectURL(file);
  }
};

userPhotoPick.addEventListener('change', () => {
  addPhoto (userPhotoPick, userPhotoPreview);
});

adPhotoPick.addEventListener('change', ()=> {
  const photoPreview = document.createElement('img');
  photoPreview.style.maxHeight = '100%';
  addPhoto(adPhotoPick, photoPreview);
  adPhotoPreview.appendChild(photoPreview);
});

export const pictureReset = () => {
  userPhotoPreview.style.padding = userPhotoPick.style.padding;
  userPhotoPreview.innerHTML = '';
  adPhotoPreview.innerHTML = '';
};
