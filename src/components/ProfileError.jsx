const ProfileError = ({children}) => {
  return (
    <div className=" fle font-semibold py-20 justify-center">
        <p className=" text-center text-2xl text-red-700">{children}</p>
    </div>
  )
}

export default ProfileError