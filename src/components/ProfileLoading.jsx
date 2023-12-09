import Image from "next/image";

const ProfileLoading = () => {
  return (
    <div className=" flex min-h-[300px] justify-center">
        <Image
          src="/mini-lodaing.svg"
          alt="Loading"
          width={100}
          height={100}
          style={{width: "auto"}}
          priority='low'
        />
    </div>
  )
}

export default ProfileLoading