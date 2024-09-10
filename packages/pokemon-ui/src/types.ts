export type Pokemon = {
  id: number;
  name: string;
  type1: string;
  type2: string;
  attack: number;
  defense: number;
  speed: number;
  imageUrl: string;
};

export type Profile = {
  id: number;
  pokemon: Pokemon[];
};
