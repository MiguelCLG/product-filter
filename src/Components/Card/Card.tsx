type Props = {
  productName: string;
  color: string;
  weight: string;
  category: string;
  wireless: string;
};

const Card: React.FC<Props> = ({
  productName,
  color,
  weight,
  category,
  wireless,
}) => {
  return (
    <div className="card" data-testid="card">
      <h2>
        <span>{productName}</span>
      </h2>
      <p>
        Color: <span>{color}</span>
      </p>
      <p>
        Weight: <span>{weight}</span>
      </p>
      <p>
        Category: <span>{category}</span>
      </p>
      <p>
        Wireless: <span>{wireless}</span>
      </p>
    </div>
  );
};

export default Card;
