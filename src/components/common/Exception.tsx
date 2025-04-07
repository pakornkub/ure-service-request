import Alert from '@/components/common/Alert';

type Props = {
  res: any;
  type: string;
};

const Exception = ({ res, type }: Props) => {
  if (type === 'onError') {
    return Alert({
      type: 'error',
      title: res?.response?.data?.title || 'System error!',
      message: res?.response?.data?.message || res?.response?.data?.error || res.message,
    });
  } else if (type === 'onSuccess') {
    return Alert({
      type: 'error',
      title: res?.data?.title || 'System error!',
      message: res?.data?.message || res?.data?.error || 'API error occurred. Please contact the DX department',
    });
  }
};

export default Exception;
