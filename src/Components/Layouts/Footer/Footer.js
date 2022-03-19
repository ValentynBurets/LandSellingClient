import React from 'react'
import logoFacebook from '../../../Assets/Images/Logo/FacebookLogo.png'
import logoTelegram from '../../../Assets/Images/Logo/TelegramLogo.png'
import logoYoutube from '../../../Assets/Images/Logo/YoutubeLogo.png'
import logoInsta from '../../../Assets/Images/Logo/InstagramLogo.png'
import logo from '../../../Assets/Images/Logo/Logo.png'
import style from  "./Footer.module.sass"

const Footer = () => (
  <div className={style.footer_style}>
      <div className={style.footer_container}>
    <div className={style.logo_image_text_style_container}>
      <div className={style.logo_image_text_style}>
        <a href='/' className={style.logo_image}>
          <img
            src={logo}
            className={style.logo_image_style}
            alt='Logo'
          />
        </a>
        <label className={style.logo_name}>LandSelling</label>
        <label className={style.text_logo_style}>All rights reserved © 2021</label>
      </div>
    </div>
    <div className={style.nav_col_container}>
      <div className={style.nav_container}>
        <label className={style.nav_title_lable}>Navigation</label>
        <div className={style.nav_link_container}>
          <a 
            href='/lots'
            className={style.nav_link}
          >
            Lots
          </a>
          <a
            href='/about_us' 
            className={style.nav_link}
          >
            About us</a>
          <a
            href='/rules' 
            className={style.nav_link}
          >
            Rules
          </a>
        </div>
      </div>
    </div>
    <div className={style.social_media_container}>
      <label>Social media:</label>
        <div>
          <div className={style.media_image_and_description}>
            <a href='/'>
              <img
                src={logoYoutube}
                height='6%'
                width='6%'
                className={style.media_image_style}
                alt='Logo'
              />
            </a>
            <a href='LandSelling.ua' className={style.media_description}>
              YouTube: LandSelling.ua
            </a>
          </div>
          <div className={style.media_image_and_description}>
            <a href='/'>
              <img
                src={logoInsta}
                height='6%'
                width='6%'
                className={style.media_image_style}
                alt='Logo'
              />
            </a>
            <a href='@LandSelling.ua' className={style.media_description}>
              Instagram: @LandSelling.ua
            </a>
          </div>
          <div className={style.media_image_and_description}>
            <a href='/'>
              <img
                src={logoFacebook}
                height='6%'
                width='6%'
                className={style.media_image_style}
                alt='Logo'
              />
            </a>
            <a href='LandSelling' className={style.media_description}>
              Facebook: LandSelling
            </a>
          </div>
          <div className={style.media_image_and_description}>
            <a href='/'>
              <img
                src={logoTelegram}
                height='6%'
                width='6%'
                className={style.media_image_style}
                alt='Logo'
              />
            </a>
            <a href='LandSelling' className={style.media_description}>
              Telegram: LandSelling
            </a>
          </div>
        </div>
    </div>
    <div className={style.contact_us}>
      <div className={style.contact_us_text_container}>
        <label className={style.contact_us_contact_label}>Contact us: </label>
        <a href='tel:380 959 171 229' className={style.contact_text_style}>
          +380 959 171 229
        </a>
      </div>
    </div>
  </div>
  </div>
)
export default Footer
