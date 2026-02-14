import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export const useRequireAuth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

 const withAuth = (action) => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        iconColor: '#CC1213',

        title: '로그인이 필요해요!',
        html: '해당 기능을 사용하려면<br/>먼저 로그인해주세요',

        showCancelButton: true,
        confirmButtonText: '로그인 하러가기',
        cancelButtonText: '나중에 할게요',
        buttonsStyling: false,
        reverseButtons: true,

        customClass: {
          popup: 'auth-required-popup',
          title: 'auth-required-title',
          htmlContainer: 'auth-required-text',
          actions: 'auth-required-actions',
          confirmButton: 'auth-required-confirm',
          cancelButton: 'auth-required-cancel',
        },

        width: 400,
        padding: '1.75rem',
        background: '#ffffff',
        backdrop: 'rgba(9, 11, 14, 0.55)',

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
