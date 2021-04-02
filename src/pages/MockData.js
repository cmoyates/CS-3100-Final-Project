import {useEffect} from "react"

const MockData = () => {

    useEffect(() => {
    const getStuff = async () => {

        const sessionAdded = await addSession();
        console.log(sessionAdded);
      
      
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
            email: "jhudson@mun.ca",
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

  const addSession = async () => {
    const res = await fetch('/sessions/', {
        method: "POST",
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: 7,
            tutorId: 1151111089711011700,
            tutoreeId: 1061041171001151100,
            location: "MUN Library",
            time: "13:00",
            date: "2021-4-3",
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