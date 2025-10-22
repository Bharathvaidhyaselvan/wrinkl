import React from 'react';

const testimonials = [
  {
    id: 1,
    content: "I've been using Wrinkl for six months now, and I'm extremely impressed with their service. My clothes always come back perfectly clean and well-pressed.",
    author: "Priya Sharma",
    position: "Working Professional",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    content: "As a busy parent, their pickup and delivery service has been a lifesaver. The staff is always friendly and the quality of cleaning is excellent.",
    author: "Rajesh Kumar",
    position: "Business Owner",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    content: "The stain removal service is fantastic! They managed to save my favorite dress that I thought was ruined forever. Highly recommended!",
    author: "Anita Desai",
    position: "College Student",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. See what our satisfied customers have to say about our services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="p-6 bg-blue-50 rounded-lg transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
              
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
              
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;