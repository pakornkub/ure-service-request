import Swal from 'sweetalert2';

type Props = {
  type: string;
  title: string;
  message: string;
}

const Alert = ({ type, title, message }: Props) => {
  if (type === 'success') {
    return Swal.fire({
      title: title,
      html: message,
      icon: 'success',
      showCloseButton: false,
      showConfirmButton: false,
    });
  } else if (type === 'error') {
    return Swal.fire({
      title: title,
      html: message || 'Unknown Error Occurred',
      icon: 'error',
      showCloseButton: false,
      showConfirmButton: false,
    });
  } else if (type === 'warning') {
    return Swal.fire({
      title: title,
      html: message,
      icon: 'warning',
      showCloseButton: false,
      showConfirmButton: false,
    });
  }
};

export default Alert;
