'use client'

interface DeleteCategoryButtonProps {
  categoryId: string
  categoryName: string
}

export default function DeleteCategoryButton({ categoryId, categoryName }: DeleteCategoryButtonProps) {
  const handleDelete = async () => {
    if (confirm(`Hapus kategori "${categoryName}"?\n\nPeringatan: Kategori dengan produk tidak bisa dihapus.`)) {
      try {
        const response = await fetch(`/api/admin/categories/${categoryId}`, {
          method: 'DELETE',
        })
        
        const data = await response.json()
        
        if (response.ok) {
          window.location.reload()
        } else {
          alert(data.error || 'Gagal menghapus kategori')
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
