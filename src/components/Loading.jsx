import Image from "next/image";

const Loading = () => {
  return (
    <div className=" flex min-h-screen justify-center">
        <Image
          src="/loading.svg"
          alt="Loading"
          width={100}
          height={100}
          priority='low'
          style={{width: "auto"}}
        />
    </div>
  )
}

export default Loading