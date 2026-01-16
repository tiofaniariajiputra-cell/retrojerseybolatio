'use client'

interface DeleteProductButtonProps {
  productId: string
  productName: string
}

export default function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
  const handleDelete = async () => {
    if (confirm(`Hapus produk "${productName}"?`)) {
      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          window.location.reload()
        } else {
          alert('Gagal menghapus produk')
        }
      } catch (error) {
        alert('Error: ' + error)
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
      title="Hapus"
    >
      🗑️
    </button>
  )
}
