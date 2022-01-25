const input = document.getElementById("formFile")
const bnt_send = document.getElementById("btn_send")
const name_file = document.getElementById("name_file")
const url = 'YOUR_URL_API'
const handlefile = () => {
    const input = document.getElementById('formFile')
    input.click()
}
const onChange = () => {
    const {
        value,
    } = input
    if (value) {
        bnt_send.style.display = "block"
        name_file.innerHTML = "You selected: " + value
    }
}
const sendFile = () => {
    const file = input.files[0]
    const ext = file.name.split('.').pop()
    const size = (Math.round(+file.size / 1024) / 1000).toFixed(2)
    // encode the file using the FileReader API
    const reader = new FileReader()
    reader.onloadend = async () => {
        // use a regex to remove data url part
        const base64String = reader.result
            .replace("data:", "")
            .replace(/^.+,/, "")

        //use slipt and pop to get file extension
        // log to console
        // logs wL2dvYWwgbW9yZ...
        const body = {
            base64Image: base64String,
            ext,
            size,
        }
        //send base64String to api
        if (size > 5) {
            return alert("You can only attach files up to 5MB")
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const json = await response.json()
        if (response.ok) {
            alert(json.message)
            window.location.reload()
        } else {
            name_file.innerHTML = "You selected: " + json.message

        }
    }
    reader.readAsDataURL(file)
}