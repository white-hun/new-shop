import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { addToCart, getCart, removeFromCart } from "../api/firebase";

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  // 사용자 별로 cache가 되도록 uid를 사용
  const cartQuery = useQuery(["carts", uid || ""], () => getCart(uid), {
    enabled: !!uid, // uid가 false인 경우 enabled 처리 => 이 때는 query가 수행되지 않음
  });

  const addOrUpdateItem = useMutation((product) => addToCart(uid, product), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
