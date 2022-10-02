import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  #cursor{
    border: 0.7px solid ${({ theme }) => theme.mainNavLink} ;
  }
  #cursor::before{
    border: 0.7px solid ${({ theme }) => theme.mainNavLink} ;
  }
  input, a, button, textarea{
    color:${({theme}) => theme.link};
    text-decoration: none; 
  }

  *:focus {
    border-color:  ${({ theme }) => theme.link};
    border-width: 0 0 1px 0;
  }

  .error_page{
    background: ${({ theme }) => theme.body};
  }

  .profile_photo{
    border: 0.7px solid ${({ theme }) => theme.mainNavLink} ;
  }
  .edit_profile_photo{
    background:  ${({ theme }) => theme.body};
    color:${({theme}) => theme.link};
    border: 0.7px solid ${({ theme }) => theme.mainNavLink} ;
  }

  .edit_profile_photo:hover{
    filter: invert(15%)
  }

  .book_now_btn{
    color: ${({ theme }) => theme.body};
    background:  ${({ theme }) => theme.hoverLink} ;
    // backdrop-filter: invert(50%);
    // filter: invert(100%);
    transition: all 0.2s linear;
  }
  .book_now_btn:hover{
    background:  ${({ theme }) => theme.text} ;
    transition: all 0.2s linear;
  }


  
  .cls-1,
  path{
    stroke: ${({theme}) => theme.text};
  }

  .cls-1:hover{
    color: ${({theme}) => theme.hoverLink};
    transition: all 0.2s linear;
  }

 .menu_bar{
  filter: drop-shadow(0 0 0.75rem ${({ theme }) => theme.body});
 }



  .menu_bar__div,
  .socials_bar__span,
  .part_menu_bar__li{
    border: 0.7px solid ${({ theme }) => theme.mainNavLink};
    background: ${({ theme }) => theme.body};
    

  }
  
  .menu_bar__div__icon{
    color: ${({ theme }) => theme.link};
    opacity: 0.7;
  }
  .part_menu_bar__li__link__icon, 
  .part_menu_bar__li__link sup{
    color: ${({ theme }) => theme.link};
  }

  .menu_bar__div__icon:hover{
    // filter: invert(100%);
    opacity: 1;
  }
  .menu_bar__div:hover{
    background: ${({ theme }) => theme.mainNavLink};
  }
  .mainNavigation{
    background: ${({ theme }) => theme.body};
    color:${({theme}) => theme.link};
  }

  .mainNavigation a{
    color: ${({theme}) => theme.mainNavLink};
  }
  .mainNavigation a:hover{
    color: ${({theme}) => theme.hoverLink};
    transition: all 0.2s linear;
  }

  .react-datepicker {
    background: ${({ theme }) => theme.body} !important;
    border-color: 0.7px solid ${({ theme }) => theme.mainNavLink} !important;
  }

  .react-datepicker__header {
    background: ${({ theme }) => theme.body} !important;
  }

  .react-datepicker__day-name{
    color: ${({ theme }) => theme.text};
  }

  .react-datepicker__day,
  .react-datepicker__day-name,
  .react-datepicker__current-month{
    color: ${({ theme }) => theme.text};
  }

  .react-datepicker__day--disabled{
    background: ${({ theme }) => theme.body} !important;
  }

  .highlights__highlight{
    border: 0.1px solid ${({ theme }) => theme.highlightBorder};
  }
  .share_like span:nth-child(1){
    border-right: 0.7px solid ${({ theme }) => theme.mainNavLink};
  }
  `


  // .menu_bar,
  // .part_menu_bar{
  //   background: ${({ theme }) => theme.body};
  // }