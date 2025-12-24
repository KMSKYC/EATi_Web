import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export const useRequireAuth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

 const withAuth = (action) => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        iconColor: '#CC1213',

        title: '로그인이 필요해요!',
        html: '해당 기능을 사용하려면<br/>먼저 로그인해주세요.',

        showCancelButton: true,

        confirmButtonText: '로그인 하러가기',
        confirmButtonColor: '#CC1213',

        cancelButtonText: '나중에 할게요',
        cancelButtonColor: '#9e9e9e',

        width: 400,
        padding: '2em',
        background: '#fff',
        backdrop: 'rgba(0,0,0,0.4)',

        scrollbarPadding: false,
        heightAuto: false,

        willOpen: () => {
          document.body.dataset.swalPrevStyle = document.body.getAttribute('style') || '';
        },
        didOpen: () => {
          document.body.setAttribute('style', document.body.dataset.swalPrevStyle);
          document.documentElement.style.removeProperty('overflow');
        },
        didClose: () => {
          delete document.body.dataset.swalPrevStyle;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return; // 원래 하려던 행동 중단
    }

    // 2. 로그인 상태면? -> 통과!
    if (action) {
      action();
    }
  };

  return withAuth;
};