import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useLocale } from '../../hooks/useLocale';
import './CoverUploader.scss';

type TImageUploaderProps = {
  image?: string
  preloadedImage?: string
  isDisabled: boolean
  uploadPreCover: (file?: File) => void
}

export const CoverUploader = observer(({
  image,
  preloadedImage,
  isDisabled,
  uploadPreCover
}: TImageUploaderProps) => {
  const { text } = useLocale()

  const imageURL = useMemo(() => (
    String(process.env.REACT_APP_SERVER_HOST) +
    (image ?
      image :
      preloadedImage ?
        preloadedImage :
        '/uploads/covers/placeholder.jpg')
  ), [image, preloadedImage])

  return (
    <div className="cover">
      <img src={imageURL} className="cover__image" />
      {!isDisabled &&
        <div className="cover__uploader">
          <label className="cover__uploader-space">
            <input
              type="file"
              className="cover__uploader-file"
              onChange={(event) => uploadPreCover(event.target.files?.[0])}
            />
            <div className="pi pi-upload"></div>
            <div className="cover__uploader-text">{text('common.fileUpload.image')}</div>
          </label>
        </div>
      }
    </div>
  )
})
