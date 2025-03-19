interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <h1 className="text-6xl font-semibold text-white text-center mb-4">
      {children}
    </h1>
  );
}
