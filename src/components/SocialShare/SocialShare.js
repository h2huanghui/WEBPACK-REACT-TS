import React from "react";
import "./index.less";

const SocialShare = React.forwardRef((props, ref) => {
  const {shareLink = window.location.href, image, desc, className, ...otherProps} = props;

  const LINK = encodeURIComponent(shareLink);
  const DESC = encodeURIComponent(desc);
  const IMAGE = encodeURIComponent(image);

  const MAIL_SUBJECT = 'Check out This Product on doba.com';
  const MAIL_BODY = `I found this product on doba.com and thought you might be interested. Here is the product information and a link to the page:%0d%0a%0d%0a
    ${DESC}%0d%0a%0d%0a${LINK}%0d%0a%0d%0a____________________%0d%0adoba.com was created with small to medium-sized businesses\'needs in mind. In establishing
    a one-stop wholesale center, we brought the most trusted Chinese factories together with small and medium-sized businesses. Learn more:%0d%0ahttps://www.doba.com/`;

  const share = {
    facebook: {
      link: `http://www.facebook.com/sharer.php?u=${LINK}`,
      width: 525,
      height: 370,
      clsName: 'facebook',
      icon: 'icon-facebook',
      title: null
    },
    google: {
      link: `https://plus.google.com/share?url=${LINK}`,
      width: 520,
      height: 440,
      clsName: 'google',
      icon: 'icon-google-plus',
      title: null
    },
    twitter: {
      link: `http://twitter.com/share?url=${LINK}&text=${DESC}`,
      width: 520,
      height: 440,
      clsName: 'twitter',
      icon: 'icon-twitter',
      title: null
    },
    mail: {
      link: `mailto:?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`,
      clsName: 'mail',
      icon: 'icon-share-mail',
      title: null
    },
    pinterest: {
      link: `http://www.pinterest.com/pin/create/button/?url=${LINK}&media=${IMAGE}&description=${DESC}`,
      width: 770,
      height: 320,
      clsName: 'pinterest',
      icon: 'icon-pinterest',
      title: null
    },
    linkedin: {
      link: `http://www.linkedin.com/shareArticle?mini=true&amp;url=${LINK}`,
      width: 520,
      height: 460,
      clsName: 'linkedin',
      icon: 'icon-linkedin',
      title: null
    }
  };
  const pinterest = image ? [share.pinterest] : [];
  const shareArr = [share.facebook, share.twitter, share.linkedin, ...pinterest];

  const handleOpenWindow = (url, type, iWidth, iHeight) => {
    const iTop = (window.screen.height - 30 - iHeight) / 2;
    const iLeft = (window.screen.width - 10 - iWidth) / 2;
    window.open(url, type, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop +
      ',left=' + iLeft + ',toolbar=no,resizeable=no,location=no,status=no');
  }

  const handleClick = (item) => {
    if (item.clsName === share.mail.clsName) {
      window.location.href = item.link;
      return;
    }
    handleOpenWindow(item.link, '_blank', (item.width || 560), (item.height || 420));
  }


  return (
    <div ref={ref} className={`sns-share ${className}`} {...otherProps}>
      {
        shareArr.map(item => (
          <a href={item.link} rel="nofollow" className={item.clsName}
             title={item.title ? item.title : ''} onClick={(event) => {
            event.preventDefault();
            handleClick(item);
          }} key={item.clsName}>
            {item.icon && <i className={`dsc-icon ${item.icon}`}></i>}
          </a>
        ))
      }
    </div>
  );
});

export default SocialShare;
