import * as React from 'react';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  content: string;
}

const Svg: React.SFC<Props> = ({ content, className, ...props }) => (
  <span
    {...props}
    className={className}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

export default Svg;
