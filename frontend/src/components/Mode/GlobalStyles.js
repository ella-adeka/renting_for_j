import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  input, a, button, textarea{
    color:${({theme}) => theme.link};
    text-decoration: none; 
  }

  .menu_bar,
  .part_menu_bar{
    background: ${({ theme }) => theme.body};
  }

  .menu_bar__div,
  .part_menu_bar__li{
    border: 0.7px solid ${({ theme }) => theme.mainNavLink};
    background: ${({ theme }) => theme.body};
  }
  
  .menu_bar__div__icon{
    color: ${({ theme }) => theme.link};
    opacity: 0.8;
  }
  .part_menu_bar__li__link__icon, 
  .part_menu_bar__li__link__icon sup{
    color: ${({ theme }) => theme.link};
  }
  .menu_bar__div__icon:hover{
    color: ${({theme}) => theme.hoverLink};
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
