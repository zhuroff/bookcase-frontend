import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useLocale } from '../../hooks/useLocale';
import './CoverUploader.scss';

type TImageUploaderProps = {
  image?: string
  isDisabled: boolean
}

export const CoverUploader = observer(({ image, isDisabled }: TImageUploaderProps) => {
  const { text } = useLocale()

  const imageURL = useMemo(() => (
    String(process.env.REACT_APP_SERVER_HOST) +
    (image
      ? image
      : '/uploads/covers/placeholder.jpg')
  ), [image])

  return (
    <div className="cover">
      <img src={imageURL} className="cover__image" />
      {!isDisabled &&
        <div className="cover__uploader">
          <label className="cover__uploader-space">
            <input
              type="file"
              className="cover__uploader-file"
            />
            <div className="pi pi-upload"></div>
            <div className="cover__uploader-text">{text('common.fileUpload.image')}</div>
          </label>
        </div>
      }
    </div>
  )
})
