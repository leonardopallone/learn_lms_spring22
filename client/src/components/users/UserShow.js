
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserShow = () => {
  const [user, setUser] = useState({ first_name: '', last_name: '' })
  const [courses, setCourses] = useState([])
  
  const { userId } = useParams()

  useEffect( () => {
    axios.get(`/api/users/${userId}`)
      .then( res => setUser(res.data))
      .catch( err => console.log(err) )
  }, [])

  useEffect( () => {
    axios.get(`/api/${userId}/courses`)
      .then( res => setCourses(res.data))
      .catch( err => console.log(err) )
  }, [])

  const { first_name, last_name } = user
  return(
    <>
      <h1>{first_name} {last_name}</h1>
      <button>Edit</button>
      <button>Delete</button>

      <h4>Current Courses</h4>
      { courses.map( c => 
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{c.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{c.subject}</Card.Subtitle>
            <Card.Text>
              {c.desc}
            </Card.Text>
            <Link to={`/courses/${c.id}`}>
              <Card.Link>Show</Card.Link>
            </Link>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default UserShow;