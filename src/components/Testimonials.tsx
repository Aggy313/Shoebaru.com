import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquareCode, ThumbsUp, CheckCircle, User, StarHalf } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';

export default function TestimonialReviews() {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>({
    't-1': 42,
    't-2': 19,
    't-3': 34,
  });
  const [votedIds, setVotedIds] = useState<string[]>([]);
  
  // Review submission state management
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('Nairobi, Ke');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleHelpfulUpvote = (id: string) => {
    if (votedIds.includes(id)) return; // Prevents duplicate voting in session
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
    setVotedIds((prev) => [...prev, id]);
  };

  const handleReviewFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const addedReview: Testimonial = {
      id: `t-custom-${Date.now()}`,
      name: newName,
      role: 'Shoebaru Owner',
      location: newLocation,
      rating: newRating,
      comment: newComment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop', // default user avatar
    };

    setReviews((prev) => [addedReview, ...prev]);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setNewName('');
      setNewComment('');
      setShowReviewForm(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-black relative border-t border-white/5 scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-gold/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Header Block with Submission Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold font-bold">Verified Buyer feedback</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-1">
              VOICES OF THE PAVEMENT
            </h2>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-white/5 hover:bg-brand-gold hover:text-brand-spruce-dark text-gray-300 font-sans font-bold text-xs px-5 py-3 rounded-full border border-white/10 hover:border-brand-gold transition-all cursor-pointer self-start md:self-auto shadow-sm"
          >
            {showReviewForm ? 'Cancel Review Entry' : 'Write a Verified Review'}
          </button>
        </div>

        {/* review dialog overlay form */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-10 bg-[#121212] overflow-hidden border border-white/10 rounded-3xl p-6 sm:p-8"
            >
              <h3 className="font-display font-bold text-lg text-white mb-4">Share your Shoebaru Experience</h3>
              
              {!isSuccess ? (
                <form onSubmit={handleReviewFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="review-name" className="block text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                        Full Name
                      </label>
                      <input
                        id="review-name"
                        type="text"
                        required
                        placeholder="e.g. Amina Mohammed"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-brand-gold text-white rounded-xl py-3 px-4 text-xs font-sans focus:outline-none transition-all placeholder:text-gray-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="review-location" className="block text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                          Location (Ke)
                        </label>
                        <select
                          id="review-location"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          className="w-full bg-black border border-white/10 focus:border-brand-gold text-white rounded-xl py-3 px-3 text-xs font-sans focus:outline-none transition-all"
                        >
                          <option value="Nairobi, Ke">Nairobi, Ke</option>
                          <option value="Eldoret, Ke">Eldoret, Ke</option>
                          <option value="Mombasa, Ke">Mombasa, Ke</option>
                          <option value="Kisumu, Ke">Kisumu, Ke</option>
                          <option value="Nakuru, Ke">Nakuru, Ke</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="review-rating" className="block text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                          Rating (Stars)
                        </label>
                        <select
                          id="review-rating"
                          value={newRating}
                          onChange={(e) => setNewRating(Number(e.target.value))}
                          className="w-full bg-black border border-white/10 focus:border-brand-gold text-white rounded-xl py-3 px-3 text-xs font-sans focus:outline-none transition-all"
                        >
                          <option value={5}>5 ★ - Absolute Elite</option>
                          <option value={4}>4 ★ - Very Solid</option>
                          <option value={3}>3 ★ - Neutral</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-4 md:space-y-0">
                    <div>
                      <label htmlFor="review-comment" className="block text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                        Detailed Review Words
                      </label>
                      <textarea
                        id="review-comment"
                        rows={4}
                        required
                        placeholder="Write dynamic feedback about foam rebound cushioning, trail outsole grip, delivery convenience, etc..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-brand-gold text-white rounded-xl py-3 px-4 text-xs font-sans focus:outline-none transition-all placeholder:text-gray-700 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-spruce-dark font-sans font-black text-xs py-3.5 rounded-xl transition-all shadow-lg shadow-brand-gold/15 hover:shadow-brand-gold/30 cursor-pointer self-end"
                    >
                      Authenticate and Post Live Review
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <p className="font-display font-bold text-sm text-white">Review Verified & Posted!</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Thank you. Your review of Shoebaru is marked as verified through receipt matching.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonial review cards grid (Responsive 3 column) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((res) => {
            const upvoted = votedIds.includes(res.id);
            return (
              <motion.div
                key={res.id}
                whileHover={{ y: -5 }}
                className="bg-[#0e0e0e]/95 border border-white/5 hover:border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative text-left"
              >
                <div className="space-y-4">
                  
                  {/* Stars indicators */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3.5 h-3.5 ${
                            idx < res.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Verified badge */}
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                      <CheckCircle className="w-3 h-3 text-emerald-400 fill-emerald-450/10" />
                      Verified Owner
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic">
                    "{res.comment}"
                  </p>
                </div>

                {/* Profile detail bar */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                      {res.avatar ? (
                        <img
                          src={res.avatar}
                          alt={res.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <User className="w-full h-full text-gray-500 scale-75" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-white leading-tight">
                        {res.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-mono tracking-wide mt-0.5">
                        {res.location}
                      </p>
                    </div>
                  </div>

                  {/* Thumbs Up helpful count action node */}
                  <button
                    onClick={() => handleHelpfulUpvote(res.id)}
                    className={`inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-[10px] font-mono tracking-tight font-medium border transition-all cursor-pointer ${
                      upvoted
                        ? 'bg-brand-gold/15 border-brand-gold/20 text-brand-gold font-bold'
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${upvoted ? 'fill-brand-gold text-brand-gold' : ''}`} />
                    Helpful ({helpfulCounts[res.id] || 0})
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
