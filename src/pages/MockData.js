import {useEffect} from "react"

const MockData = () => {

    useEffect(() => {
    const getStuff = async () => {
        const tutorFromServer = await addTutor();
        console.log(tutorFromServer);
      
      
      //setTutor(stuffFromServer);
    }
    getStuff()
}, [])
    
    const addTutor = async () => {
    const res = await fetch('/tutors/', {
        method: "POST",
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: 7,
            firstName: "Notcristopher",
            lastName: "Notyates",
            email: "cmoyates@mun.ca",
            description: "Idk",
            phoneNumber: 1230123123,
            availabilities: [false, false],
            subjects: ["english", "notcompsci"],
            feedback: 1.3
        })
    });
    const data = await res.json();
    return data;
  }

    return (
        <div>
            <p>hi</p>
        </div>
    )
}

export default MockData