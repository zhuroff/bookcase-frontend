import { observer } from 'mobx-react-lite'

export const Page404 = observer(() => {
  return (
    <>
      <div className="private__hero">
        {/* <h1 className="private__title">{ locale.message('pageNotFoundHeading') }</h1> */}
        Page Not Found
      </div>
    </>
  )
})
