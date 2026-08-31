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
        window.location.href="index.html"
    } catch (error) {
        alert(error.response.data.message)
    }

    email.value = ""
    password.value = ""
})