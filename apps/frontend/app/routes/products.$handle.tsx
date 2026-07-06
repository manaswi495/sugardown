import React, { useState } from 'react';
import {useLoaderData} from 'react-router';
import type {Route} from './+types/products.$handle';
import {useLocalCart} from '~/context/CartContext';
import {useAside} from '~/components/Aside';

export const meta: Route.MetaFunction = ({data}) => {
  const title = `${data?.product?.title ?? 'Product'} — Sugar Down`;
  const description = data?.product?.description ?? 'Ayurvedic wellness products by Sugar Down.';
  const image = data?.product?.image ?? '';
  
  return [
    {title},
    {name: 'description', content: description},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:image', content: image},
  ];
};

import { localProducts } from '~/lib/products';

export async function loader({params}: Route.LoaderArgs) {
  const {handle} = params;
  
  let products: any[] = [];
  try {
    // Fetch from our new API
    const response = await fetch('http://localhost:3020/api/products');
    const data = await response.json();
    if (Array.isArray(data)) {
      products = data;
    } else {
      console.warn("API didn't return an array, falling back to local products.");
      products = localProducts;
    }
  } catch (err) {
    console.error("Failed to fetch products, falling back to local products.", err);
    products = localProducts;
  }
  
  const product = products.find((p: any) => p.handle === handle);

  if (!product) {
    throw new Response(null, {status: 404, statusText: 'Not Found'});
  }

  return {product};
}

export default function ProductPage() {
  const {product} = useLoaderData<typeof loader>();
  const {addItem} = useLocalCart();
  const {open} = useAside();
  
  // Need to import useState locally if not at file top, but it is available.
  const [quantity, setQuantity] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f8fafc, #edf2f7)',
      padding: '40px 20px',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        gap: '40px',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      }}>
        
        {/* Premium Image Gallery Showcase */}
        <div style={{
          flex: '1 1 350px',
          aspectRatio: '1 / 1',
          maxWidth: '450px',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '16px',
          boxShadow: '0 20px 40px rgba(27, 77, 46, 0.04)',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid rgba(27, 77, 46, 0.08)',
          overflow: 'hidden'
        }}>
          {/* Glowing backdrop */}
          <div style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(56, 161, 105, 0.1) 0%, rgba(255,255,255,0) 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }} />

          {product.media && product.media.length > 0 ? (
            product.media.map((mediaUrl: string, idx: number) => (
              mediaUrl.match(/\.(mp4|webm)$/i) ? (
                <video key={idx} src={mediaUrl} controls autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px', position: 'relative', zIndex: 1, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
              ) : (
                <img key={idx} src={mediaUrl} alt={`${product.title} view ${idx + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))' }} />
              )
            ))
          ) : (
            <img src={product.image} alt={product.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.15))' }} />
          )}
        </div>
        
        {/* Product Information */}
        <div style={{ flex: '1 1 450px', paddingTop: '0px' }}>
          
          <div style={{ fontSize: '12px', letterSpacing: '2px', color: '#38A169', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
            Sugar Down Wellness
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#1B4D2E', marginBottom: '12px', letterSpacing: '-0.5px', lineHeight: '1.1' }}>
            {product.title}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: '#0F331D' }}>₹{product.price}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '18px', color: '#94A3B8', textDecoration: 'line-through', fontWeight: '500' }}>₹{product.originalPrice}</span>
            )}
            {product.originalPrice && (
              <span style={{ background: '#E8F5EA', color: '#2F855A', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', marginLeft: '4px' }}>
                Save ₹{product.originalPrice - product.price}
              </span>
            )}
          </div>
          
          <p style={{ fontSize: '15px', lineHeight: '1.5', color: '#475569', marginBottom: '20px', fontWeight: '400' }}>
            {product.description}
          </p>
          
          {/* Benefits Section */}
          <div style={{ marginBottom: '24px', background: '#ffffff', padding: '16px 20px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '16px', color: '#1E293B', fontWeight: '700' }}>What's Included & Benefits</h3>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {product.benefits.map((benefit: string, i: number) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #E8F5EA 0%, #C6F6D5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(56, 161, 105, 0.15)'
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="#2F855A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ color: '#334155', fontSize: '14px', lineHeight: '1.4', paddingTop: '2px', fontWeight: '500' }}>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            {/* Quantity Selector */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: '#ffffff', 
              border: '1px solid #E2E8F0', 
              borderRadius: '100px', 
              padding: '4px' 
            }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#F1F5F9', color: '#475569', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
                onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
              >-</button>
              <span style={{ width: '40px', textAlign: 'center', fontWeight: '600', color: '#1E293B', fontSize: '16px' }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#F1F5F9', color: '#475569', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
                onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
              >+</button>
            </div>

            {/* CTA Action */}
            {product.stock <= 0 ? (
              <button 
                disabled
                style={{ flex: 1, padding: '16px', fontSize: '16px', background: '#F1F5F9', color: '#94A3B8', border: '2px dashed #CBD5E1', borderRadius: '100px', fontWeight: '700', cursor: 'not-allowed', letterSpacing: '1px' }}
              >
                OUT OF STOCK
              </button>
            ) : (
              <button 
                style={{ 
                  flex: 1, 
                  padding: '16px', 
                  fontSize: '16px', 
                  background: 'linear-gradient(135deg, #1B4D2E 0%, #143A22 100%)', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '100px', 
                  fontWeight: '700', 
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  boxShadow: '0 10px 25px rgba(27, 77, 46, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(27, 77, 46, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(27, 77, 46, 0.3)';
                }}
                onClick={() => {
                  addItem(product, quantity);
                  open('cart');
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                ADD TO CART
              </button>
            )}
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 8px', borderBottom: '1px solid #E2E8F0', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '13px', fontWeight: '500' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Fast Delivery
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '13px', fontWeight: '500' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              Premium Box
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '13px', fontWeight: '500' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              100% Ayurvedic
            </div>
          </div>

          {/* Expandable Info Accordion */}
          <div 
            onClick={() => setShowInfo(!showInfo)}
            style={{ padding: '12px 8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: showInfo ? '#F8FAFC' : 'transparent', borderRadius: '8px', transition: 'background 0.2s' }}
          >
            <span style={{ fontWeight: '600', color: '#1E293B', fontSize: '14px' }}>Product & Usage Information</span>
            <span style={{ color: '#64748B', transform: showInfo ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>▼</span>
          </div>
          {showInfo && (
            <div style={{ padding: '16px 8px', color: '#475569', fontSize: '14px', lineHeight: '1.6', background: '#F8FAFC', borderRadius: '0 0 8px 8px', borderTop: 'none' }}>
              Take as directed by your Ayurvedic physician or follow the standard daily routine. For best results, use consistently for at least 3 months and maintain a balanced diet. Do not exceed the recommended daily dose.
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
