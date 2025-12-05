package com.vishwa.ecommerce_backend.service

import com.vishwa.ecommerce_backend.entity.Address
import com.vishwa.ecommerce_backend.repository.AddressRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AddressService {

    AddressRepository addressRepository

    AddressService(AddressRepository ar) {
        this.addressRepository = ar
    }

    List<Address> listForUser(Long userId) {
        addressRepository.findAllByUserIdOrderByIsDefaultDescIdDesc(userId)
    }

    Address get(Long id) {
        addressRepository.findById(id).orElse(null)
    }

    Address create(Address a) {
        a.createdAt = java.time.OffsetDateTime.now()
        a.updatedAt = java.time.OffsetDateTime.now()
        if (a.isDefault == null) a.isDefault = false
        def saved = addressRepository.save(a)
        if (saved.isDefault) {
            setDefaultForUser(saved.userId, saved.id)
        }
        saved
    }

    Address update(Long id, Address payload) {
        def existing = get(id)
        if (!existing) return null

        existing.label = payload.label
        existing.fullName = payload.fullName
        existing.phone = payload.phone
        existing.line1 = payload.line1
        existing.line2 = payload.line2
        existing.city = payload.city
        existing.state = payload.state
        existing.postalCode = payload.postalCode
        existing.country = payload.country
        existing.latitude = payload.latitude
        existing.longitude = payload.longitude
        existing.isDefault = payload.isDefault ?: false
        existing.updatedAt = java.time.OffsetDateTime.now()

        def saved = addressRepository.save(existing)
        if (saved.isDefault) {
            setDefaultForUser(saved.userId, saved.id)
        }
        saved
    }

    void delete(Long id) {
        addressRepository.deleteById(id)
    }

    @Transactional
    void setDefaultForUser(Long userId, Long addressId) {
        // Clear other defaults
        addressRepository.findAllByUserIdOrderByIsDefaultDescIdDesc(userId)
            .each { a -> if (a.id != addressId) { a.isDefault = false; addressRepository.save(a) } }

        def target = get(addressId)
        if (target) {
            target.isDefault = true
            addressRepository.save(target)
        }
    }
}
