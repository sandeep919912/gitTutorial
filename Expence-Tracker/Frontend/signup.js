const form = document.querySelector("form")
const API = "http://localhost:3000/users/signup"

const name  = document.querySelector("#namebox")
const email  = document.querySelector("#emailbox")
const password  = document.querySelector("#passwordbox")


form.addEventListener("submit" , async (e)=>{
    e.preventDefault()

    const formData = {
        name:name.value,
        email:email.value,
        password:password.value
    }

    console.log(formData)

    try {
        const res = await axios.post(API , formData)
        alert(res.data)
    } catch (error) {
        alert(error.response.data.message)
    }

    name.value = ""
    email.value = ""
    password.value = ""
})