import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `MaisVendidos`.
 */
export type MaisVendidosProps = SliceComponentProps<Content.MaisVendidosSlice>;

/**
 * Component for "MaisVendidos" Slices.
 */
const MaisVendidos = ({ slice }: MaisVendidosProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for mais_vendidos (variation: {slice.variation})
      Slices
    </section>
  );
};

export default MaisVendidos;
