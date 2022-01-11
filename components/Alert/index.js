export default function Alert({ error, success }) {
  if (error) {
    return (
      <div
        className='alert alert-danger alert-dismissible fade show'
        role='alert'
      >
        <strong>Error!</strong> {error}
      </div>
    )
  } else if (success) {
    return (
      <div
        className='alert alert-success alert-dismissible fade show'
        role='alert'
      >
        <strong>Success!</strong> {success}
      </div>
    )
  } else {
    return <></>
  }
}
