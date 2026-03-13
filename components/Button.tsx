// import Image from "next/image";

import Link from "next/link";

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  // icon?: string;
  variant: string;
  full?: boolean;
  onClick?: () => void;
  // href?: string;
}
// icon,
const Button = ({ type, title, variant, full, onClick }: ButtonProps) => {
  // const content = (
  //   <button
  //     className={`flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'}`}
  //     type={type}
  //   >
  //     {/* {icon && <Image src={icon} alt={title} width={24} height={24} />} */}
  //     <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
  //   </button>
  // );

  // if (href) {
  //   return <Link href={href}>{content}</Link>;
  // }
  return (
    <button
      onClick={onClick}
      className={`flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'}`}
      type={type}
    >
      {/* {icon && <Image src={icon} alt={title} width={24} height={24} />} */}
      <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
    </button>
    // content
  )
}

export default Button