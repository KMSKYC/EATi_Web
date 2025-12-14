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
        iconColor: '#CC1213', // 보라색 아이콘
        
        title: '로그인이 필요해요!',
        html: '해당 기능을 사용하려면<br/>먼저 로그인해주세요.', // 줄바꿈 추가
        
        showCancelButton: true,
        
        // (★ 수정 2) 버튼 텍스트와 색상 조정
        confirmButtonText: '로그인 하러가기',
        confirmButtonColor: '#CC1213', // 브랜드 보라색
        
        cancelButtonText: '나중에 할게요', // 좀 더 부드러운 말투
        cancelButtonColor: '#9e9e9e',  // (★) 취소는 회색으로 (로그인 버튼 강조)
        
        // (★ 수정 3) 버튼 스타일 둥글게, 간격 조정
        width: 400,
        padding: '2em',
        background: '#fff',
        backdrop: `
          rgba(0,0,0,0.4)
        `
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