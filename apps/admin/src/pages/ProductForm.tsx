import { useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    originalPrice: '',
    description: '',
    image: '',
    media: [] as string[],
    sku: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3020/api/admin/products/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        setFormData({
          title: data.title || '',
          price: data.price ? String(data.price) : '',
          originalPrice: data.originalPrice ? String(data.originalPrice) : '',
          description: data.description || '',
          image: data.image || '',
          media: data.media || [],
          sku: data.sku || '',
          stock: data.stock !== undefined ? String(data.stock) : '0'
        });
        if (data.image) {
          setImagePreview(data.image.startsWith('http') ? data.image : `http://localhost:3000${data.image}`);
        }
        if (data.media && data.media.length > 0) {
          setMediaPreviews(data.media.map((m: string) => m.startsWith('http') ? m : `http://localhost:3000${m}`));
        }
      })
      .catch(console.error);
    }
  }, [id, token]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      setUploadFiles([...uploadFiles, ...filesArray]);
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setMediaPreviews([...mediaPreviews, ...newPreviews]);
      
      if (!imagePreview) {
        setImagePreview(newPreviews[0]); // First image acts as primary thumbnail
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let uploadedMedia: string[] = formData.media;
      
      // If we have new files to upload
      if (uploadFiles.length > 0) {
        const uploadData = new FormData();
        uploadFiles.forEach(file => uploadData.append('files', file));
        
        const uploadRes = await fetch('http://localhost:3020/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: uploadData
        });
        
        if (uploadRes.ok) {
          const uploadResult = await uploadRes.json();
          if (uploadResult.urls) {
             uploadedMedia = [...uploadedMedia, ...uploadResult.urls];
          }
        } else {
          alert('Failed to upload media files');
          setLoading(false);
          return;
        }
      }
      
      const finalFormData = {
        ...formData,
        media: uploadedMedia,
        image: uploadedMedia.length > 0 ? uploadedMedia[0] : formData.image
      };

      const url = id ? `http://localhost:3020/api/admin/products/${id}` : `http://localhost:3020/api/admin/products`;
      const method = id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(finalFormData)
      });
      
      if (res.ok) {
        navigate('/products');
      } else {
        const error = await res.json();
        alert('Failed to save: ' + error.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{id ? 'Edit Product' : 'Add New Product'}</h2>
        <button
          onClick={() => navigate('/products')}
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column: Media Uploader */}
        <div className="col-span-1">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Media</h3>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors mb-4 ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-blue-600">Click or drag files to this area to upload</p>
              <p className="text-xs text-gray-500 mt-1">Support for bulk upload. Images & Videos.</p>
            </div>
            
            {mediaPreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {mediaPreviews.map((src, idx) => (
                  <div key={idx} className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
                    {src.match(/\.(mp4|webm)$/i) || src.startsWith('blob:') && uploadFiles[idx]?.type.startsWith('video') ? (
                      <video src={src} className="w-full h-full object-cover" />
                    ) : (
                      <img src={src} className="w-full h-full object-cover" alt={`Preview ${idx}`} />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-xs text-gray-400 mt-3">Images will be securely uploaded. Videos (mp4/webm) supported.</p>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">General Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="e.g. Core Kit" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU (Stock Keeping Unit)</label>
                  <input value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="e.g. SD-CORE-001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inventory (Units)</label>
                  <input value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="e.g. 50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="1310" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Compare-at Price (₹)</label>
                  <input value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="1379" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Enter rich text description..."></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg shadow-sm transition-colors">
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
