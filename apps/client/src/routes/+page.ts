
export async function load({ fetch }) {

  try {


    const res = await fetch("http://localhost:4000/")


    return {
      data: await res.text()
    }
  } catch (error) {

    console.log(error)

    return {
      data: "error"
    }
  }




}