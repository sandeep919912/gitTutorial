const form = document.querySelector("form")
const API = "http://localhost:3000/users/login"

const email  = document.querySelector("#emailbox")
const password  = document.querySelector("#passwordbox")


form.addEventListener("submit" , async (e)=>{
    e.preventDefault()

    const formData = {
        email:email.value,
        password:password.value
    }

    console.log(formData)

    try {
        const res = await axios.post(API , formData)
        alert(res.data.message)
        localStorage.setItem("token", res.data.token)
        window.location.href="index.html"
    } catch (error) {
        alert(error.response.data.message)
    }

    email.value = ""
    password.value = ""
})


const dummyEmail = "lowokig793@crybio.com"
const forgotBtn = document.querySelector(".forgotpass")

forgotBtn.addEventListener("click" , async () => {
    try {
        console.log("clicked")

        const res = await axios.post("http://localhost:3000/users/verify/email" , {email:dummyEmail})
        console.log(res)
    } catch (error) {
        console.log(error)
    }
})