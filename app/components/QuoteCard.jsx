export default function QuoteCard({ quote }) {
    // Function to format the createdAt date in Indian format (dd-mm-yyyy)
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    };
  
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
        <div
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${quote.mediaUrl})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <p className="absolute bottom-4 left-4 text-white text-lg font-semibold px-4 py-2 bg-black bg-opacity-60 rounded-md max-w-xs">
            {quote.text}
          </p>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500">
            Posted by <strong>{quote.username}</strong> on{' '}
            <span className="text-gray-400">{formatDate(quote.createdAt)}</span>
          </p>
        </div>
      </div>
    );
  }
  