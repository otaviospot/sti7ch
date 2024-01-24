import * as svgs from '../assets/images/svgs';

const SvgRenderer = ({ slug }) => {
  const SvgImage = svgs[slug]; // Assuming `imageUrl` is the file name without extension
  return <div>{SvgImage ? <SvgImage /> : null}</div>;
};

export default SvgRenderer;
